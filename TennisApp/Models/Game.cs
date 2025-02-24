using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace TennisApp.Models
{
    public class Game
    {
        public int Id { get; set; }

        // Points scored by each player (e.g., "15", "30", "40", "Advantage")
        public List<string> PointsPlayer1 { get; set; } = [];
        public List<string> PointsPlayer2 { get; set; } = [];

        [DefaultValue(false)]
        public bool IsCompleted { get; set; }

        // ID of the player who won the game (nullable until the game is completed)
        public int? WinnerId { get; set; }

        // Method to determine the winner of the game
        public void DetermineWinner()
        {
            int player1Score = ConvertPointsToScore(PointsPlayer1);
            int player2Score = ConvertPointsToScore(PointsPlayer2);

            // Check if either player has won the game
            if (player1Score >= 4 && player1Score - player2Score >= 2)
            {
                WinnerId = 1; // Player 1 wins
                IsCompleted = true;
            }
            else if (player2Score >= 4 && player2Score - player1Score >= 2)
            {
                WinnerId = 2; // Player 2 wins
                IsCompleted = true;
            }
        }

        // Helper method to convert points list to a numeric score
        private int ConvertPointsToScore(List<string> points)
        {
            int score = 0;
            foreach (var point in points)
            {
                switch (point)
                {
                    case "15":
                        score = 1;
                        break;
                    case "30":
                        score = 2;
                        break;
                    case "40":
                        score = 3;
                        break;
                    case "Advantage":
                        score = 4;
                        break;
                    default: // "0" or invalid point
                        break;
                }
            }
            return score;
        }
    }
}