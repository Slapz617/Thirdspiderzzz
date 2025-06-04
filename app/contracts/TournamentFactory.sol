// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TournamentFactory is Ownable, ReentrancyGuard {
    IERC20 public platformToken;
    uint256 public minTokensToHost;
    
    struct Tournament {
        uint256 id;
        address host;
        string gameType;
        uint256 buyIn;
        uint256 minPlayers;
        uint256 maxPlayers;
        uint256 startTime;
        uint256 duration;
        uint256[] prizeDistribution;
        bool isActive;
        mapping(address => bool) registeredPlayers;
        uint256 playerCount;
    }
    
    mapping(uint256 => Tournament) public tournaments;
    uint256 public tournamentCount;
    
    event TournamentCreated(uint256 indexed id, address indexed host, string gameType);
    event PlayerRegistered(uint256 indexed tournamentId, address indexed player);
    event TournamentStarted(uint256 indexed id);
    event TournamentEnded(uint256 indexed id);
    
    constructor(address _platformToken, uint256 _minTokensToHost) {
        platformToken = IERC20(_platformToken);
        minTokensToHost = _minTokensToHost;
    }
    
    function createTournament(
        string memory _gameType,
        uint256 _buyIn,
        uint256 _minPlayers,
        uint256 _maxPlayers,
        uint256 _startTime,
        uint256 _duration,
        uint256[] memory _prizeDistribution
    ) external nonReentrant {
        require(
            platformToken.balanceOf(msg.sender) >= minTokensToHost,
            "Insufficient tokens to host"
        );
        
        require(_startTime > block.timestamp, "Invalid start time");
        require(_minPlayers >= 2, "Min players must be >= 2");
        require(_maxPlayers >= _minPlayers, "Max players must be >= min players");
        
        uint256 totalDistribution = 0;
        for(uint256 i = 0; i < _prizeDistribution.length; i++) {
            totalDistribution += _prizeDistribution[i];
        }
        require(totalDistribution == 100, "Prize distribution must total 100%");
        
        Tournament storage newTournament = tournaments[tournamentCount];
        newTournament.id = tournamentCount;
        newTournament.host = msg.sender;
        newTournament.gameType = _gameType;
        newTournament.buyIn = _buyIn;
        newTournament.minPlayers = _minPlayers;
        newTournament.maxPlayers = _maxPlayers;
        newTournament.startTime = _startTime;
        newTournament.duration = _duration;
        newTournament.prizeDistribution = _prizeDistribution;
        newTournament.isActive = true;
        
        emit TournamentCreated(tournamentCount, msg.sender, _gameType);
        tournamentCount++;
    }
    
    function registerForTournament(uint256 _tournamentId) external nonReentrant {
        Tournament storage tournament = tournaments[_tournamentId];
        require(tournament.isActive, "Tournament not active");
        require(block.timestamp < tournament.startTime, "Tournament already started");
        require(!tournament.registeredPlayers[msg.sender], "Already registered");
        require(tournament.playerCount < tournament.maxPlayers, "Tournament full");
        
        require(
            platformToken.transferFrom(msg.sender, address(this), tournament.buyIn),
            "Transfer failed"
        );
        
        tournament.registeredPlayers[msg.sender] = true;
        tournament.playerCount++;
        
        emit PlayerRegistered(_tournamentId, msg.sender);
    }
    
    function startTournament(uint256 _tournamentId) external {
        Tournament storage tournament = tournaments[_tournamentId];
        require(msg.sender == tournament.host, "Only host can start");
        require(tournament.isActive, "Tournament not active");
        require(block.timestamp >= tournament.startTime, "Too early to start");
        require(tournament.playerCount >= tournament.minPlayers, "Not enough players");
        
        emit TournamentStarted(_tournamentId);
    }
    
    function endTournament(uint256 _tournamentId, address[] memory winners) external {
        Tournament storage tournament = tournaments[_tournamentId];
        require(msg.sender == tournament.host, "Only host can end");
        require(tournament.isActive, "Tournament not active");
        require(winners.length <= tournament.prizeDistribution.length, "Too many winners");
        
        uint256 totalPrize = tournament.buyIn * tournament.playerCount;
        
        for(uint256 i = 0; i < winners.length; i++) {
            uint256 prize = (totalPrize * tournament.prizeDistribution[i]) / 100;
            require(
                platformToken.transfer(winners[i], prize),
                "Prize transfer failed"
            );
        }
        
        tournament.isActive = false;
        emit TournamentEnded(_tournamentId);
    }
}