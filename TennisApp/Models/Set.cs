using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TennisApp.Models
{
    public class Set
    {
        // Primary key
        public int Id { get; set; }

        // Foreign key to Match
        [Required]
        public Match? Match { get; set; }

        // Set number (e.g., Set 1, Set 2)
        [Required]
        public int SetNumber { get; set; }

        // Games won by each player
        public int? Player1Games { get; set; } = 0;
        public int? Player2Games { get; set; } = 0;

        // List of games in the set
        public List<Game> Games { get; set; } = [];

        // Indicates if the set is completed
        public bool IsCompleted { get; set; }

        // ID of the player who won the set (nullable until set is completed)
        public int? WinnerId { get; set; }

        // Timestamps for start and end of the set
        [DataType(DataType.DateTime)]
        public DateTime? StartTime { get; set; }
        
        [DataType(DataType.DateTime)]
        public DateTime? EndTime { get; set; }

        public Game NewGame()
        {
            Game Game = new();
            Games.Add(Game);
            return Game;
        }

        public void CompleteGame(Game game)
        {
            if (game.IsCompleted && game.WinnerId.HasValue)
            {
                // Increment the corresponding player's game count
                if (game.WinnerId == 1)
                {
                    Player1Games++;
                }
                else if (game.WinnerId == 2)
                {
                    Player2Games++;
                }

                // Check if the set is completed
                DetermineSetWinner();
                if (!IsCompleted)
                {
                    NewGame();
                }
            }
        }

        private void DetermineSetWinner()
        {
            if (Player1Games >= 6 && Player1Games - Player2Games >= 2)
            {
                WinnerId = 1; // Player 1 wins the set
                IsCompleted = true;
                EndTime = DateTime.UtcNow; // Record the end time
            }
            else if (Player2Games >= 6 && Player2Games - Player1Games >= 2)
            {
                WinnerId = 2; // Player 2 wins the set
                IsCompleted = true;
                EndTime = DateTime.UtcNow; // Record the end time
            }
        }

        public void StartSet()
        {
            StartTime = DateTime.UtcNow;
        }
    }
}