// Add this helper function to check if BracketsViewer is loaded
window.isBracketsViewerLoaded = function () {
    window.bracketsViewer = new BracketsViewer();
    return typeof BracketsViewer !== 'undefined';
};

// Main function to render the tournament bracket
window.renderTournamentBracket = function (tournamentData) {
    try {
        console.log('Starting bracket render with BracketsViewer library...');
        const container = document.getElementById("bracketsViewerContainer");

        if (!container) {
            throw new Error('Bracket container element not found');
        }

        // Show loading state
        container.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary"></div><p class="mt-2">Loading bracket...</p></div>';

        // Parse the tournament data if it's a string
        let parsedData = tournamentData;
        if (typeof tournamentData === 'string') {
            try {
                parsedData = JSON.parse(tournamentData);
                console.log('Successfully parsed tournament data from string');
            } catch (parseError) {
                console.error('Failed to parse tournament data:', parseError);
                throw new Error('Invalid tournament data format');
            }
        }

        // Check if BracketsViewer is available
        if (typeof BracketsViewer === 'undefined') {
            console.error('BracketsViewer is not defined. Make sure the library is loaded correctly.');
            container.innerHTML = '<div class="alert alert-danger">BracketsViewer library is not available. Please ensure the library is loaded correctly.</div>';
            return;
        }

        // Initialize BracketsViewer
        window.bracketsViewer = new BracketsViewer();

        // Convert tournament data to the expected format
        const convertedData = {
            stage: [{
                id: 1,
                name: parsedData.name || "Tournament",
                type: "single_elimination"
            }],
            participant: [],
            match: [],
            match_game: []
        };

        console.log('Converting tournament data...');

        const participantMap = new Map();
        let participantId = 1;

        // Process all participants first
        parsedData.rounds.forEach(round => {
            if (round.matches && Array.isArray(round.matches)) {
                round.matches.forEach(matchData => {
                    if (matchData.match) {
                        const match = matchData.match;

                        // Process player 1
                        if (match.player1Id && !participantMap.has(match.player1Id)) {
                            participantMap.set(match.player1Id, participantId++);
                            convertedData.participant.push({
                                id: participantMap.get(match.player1Id),
                                name: match.player1Name || "Player 1"
                            });
                        }

                        // Process player 2
                        if (match.player2Id && !participantMap.has(match.player2Id)) {
                            participantMap.set(match.player2Id, participantId++);
                            convertedData.participant.push({
                                id: participantMap.get(match.player2Id),
                                name: match.player2Name || "Player 2"
                            });
                        }
                    }
                });
            }
        });

        // Now process all matches
        let matchId = 1;
        parsedData.rounds.forEach((round, roundIndex) => {
            if (round.matches && Array.isArray(round.matches)) {
                round.matches.forEach((matchData, matchIndex) => {
                    if (matchData.match) {
                        const match = matchData.match;

                        // Process match results
                        const opponent1Id = match.player1Id ? participantMap.get(match.player1Id) : null;
                        const opponent2Id = match.player2Id ? participantMap.get(match.player2Id) : null;

                        // Determine match status (4 = completed in the example)
                        let status = 1; // Default status (1 = pending)
                        let opponent1Score = null;
                        let opponent2Score = null;

                        if (matchData.winnerPlayerId) {
                            status = 4; // Completed

                            if (matchData.winnerPlayerId === match.player1Id) {
                                opponent1Score = 2;
                                opponent2Score = 0;
                            } else if (matchData.winnerPlayerId === match.player2Id) {
                                opponent1Score = 0;
                                opponent2Score = 2;
                            }
                        }

                        // Create match object
                        const matchObj = {
                            id: matchId++,
                            stage_id: 1,
                            group_id: 1,
                            round_id: roundIndex + 1,
                            number: matchIndex + 1,
                            status: status,
                            opponent1: {
                                id: opponent1Id,
                                score: opponent1Score
                            },
                            opponent2: {
                                id: opponent2Id,
                                score: opponent2Score
                            }
                        };

                        // Add special property for our click handler
                        matchObj.matchId = match.id;

                        convertedData.match.push(matchObj);
                    }
                });
            }
        });

        if (convertedData.participant.length === 0 || convertedData.match.length === 0) {
            console.warn('No valid participants or matches found in the data');
            container.innerHTML = '<div class="alert alert-warning">No valid tournament data available to display.</div>';
            return;
        }

        // Clear the container
        container.innerHTML = '';

        console.log('Rendering bracket with library...');

        // Use the library to render
        window.bracketsViewer.render({
            stages: convertedData.stage,
            matches: convertedData.match,
            matchGames: convertedData.match_game,
            participants: convertedData.participant,
        }, {
            selector: '#bracketsViewerContainer',
            participantOriginPlacement: 'before',
            separatedChildCountLabel: true,
            showSlotsOrigin: true,
            highlightParticipantOnHover: true,
            onMatchClick: function (match) {
                if (match.matchId) {
                    window.location.href = `/matches/details/${match.matchId}`;
                }
            }
        });

        applyCustomStyles();
        console.log('Bracket rendered successfully');

    } catch (error) {
        console.error('Bracket render error:', error);
        const container = document.getElementById("bracketsViewerContainer");
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error rendering bracket</h4>
                    <p>${error.message}</p>
                    <p>Please check the browser console for more details.</p>
                </div>`;
        }
    }
};

function applyCustomStyles() {
    // Remove any existing custom styles
    const existingStyle = document.getElementById('brackets-viewer-custom-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Create and add new styles
    const style = document.createElement('style');
    style.id = 'brackets-viewer-custom-styles';
    style.textContent = `
        .brackets-viewer .match {
            background-color: var(--surface, #1e1e2e);
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 8px;
            margin: 5px;
        }

        .brackets-viewer .participant {
            padding: 6px;
            border-radius: 4px;
            margin: 2px 0;
        }

        .brackets-viewer .connect-previous, 
        .brackets-viewer .connect-next {
            stroke: var(--primary, #89b4fa);
            stroke-width: 2px;
        }

        .brackets-viewer .name {
            font-weight: bold;
        }

        .brackets-viewer .result {
            font-weight: bold;
            color: var(--primary, #89b4fa);
        }

        .brackets-viewer .participant.win .name {
            color: var(--success, #a6e3a1);
        }

        .brackets-viewer .participant.loss .name {
            color: var(--danger, #f38ba8);
        }
    `;
    document.head.appendChild(style);
}

console.log('Direct BracketsViewer integration loaded');