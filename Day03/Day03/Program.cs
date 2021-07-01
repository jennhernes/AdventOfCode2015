using System;
using System.Collections.Generic;
using System.IO;

namespace Day03
{
    class Program
    {
        static void Main(string[] args)
        {
            // Part1();
            Part2();
        }

        static void Part1()
        {
            var sr = new StreamReader("../../../../input.txt");

            string directions = sr.ReadLine();

            var east = 0;
            var north = 0;
            var history = new Dictionary<int, HashSet<int>>();

            history.Add(east, new HashSet<int>());
            history[east].Add(north);
            foreach (char c in directions)
            {
                if (c == '^')
                {
                    north += 1;
                }
                else if (c == 'v')
                {
                    north -= 1;
                }
                else if (c == '>')
                {
                    east += 1;
                }
                else if (c == '<')
                {
                    east -= 1;
                }
                if (!history.ContainsKey(east))
                    history.Add(east, new HashSet<int>());
                history[east].Add(north);
            }

            int houses = 0;
            foreach (HashSet<int> hs in history.Values)
            {
                houses += hs.Count;
            }
            Console.WriteLine(houses);
        }

        static void Part2()
        {
            var sr = new StreamReader("../../../../input.txt");

            string directions = sr.ReadLine();

            var santa_east = 0;
            var santa_north = 0;
            var robo_east = 0;
            var robo_north = 0;
            var history = new Dictionary<int, HashSet<int>>();
            bool isSanta = true;

            history.Add(santa_east, new HashSet<int>());
            history[santa_east].Add(santa_north);
            foreach (char c in directions)
            {
                if (isSanta)
                {
                    if (c == '^')
                    {
                        santa_north += 1;
                    }
                    else if (c == 'v')
                    {
                        santa_north -= 1;
                    }
                    else if (c == '>')
                    {
                        santa_east += 1;
                    }
                    else if (c == '<')
                    {
                        santa_east -= 1;
                    }
                    if (!history.ContainsKey(santa_east))
                        history.Add(santa_east, new HashSet<int>());
                    history[santa_east].Add(santa_north);
                }
                else
                {
                    if (c == '^')
                    {
                        robo_north += 1;
                    }
                    else if (c == 'v')
                    {
                        robo_north -= 1;
                    }
                    else if (c == '>')
                    {
                        robo_east += 1;
                    }
                    else if (c == '<')
                    {
                        robo_east -= 1;
                    }
                    if (!history.ContainsKey(robo_east))
                        history.Add(robo_east, new HashSet<int>());
                    history[robo_east].Add(robo_north);
                }
                isSanta = !isSanta;
            }

            int houses = 0;
            foreach (HashSet<int> hs in history.Values)
            {
                houses += hs.Count;
            }
            Console.WriteLine(houses);
        }
    }

    public class Position
    {
        int east;
        int north;

        public int East { get => east; set => east = value; }
        public int North { get => north; set => north = value; }

        public Position(int east, int north)
        {
            this.east = east;
            this.north = north;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Position other = (Position)obj;
                return (east == other.east) && (north == other.north);
            }
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
