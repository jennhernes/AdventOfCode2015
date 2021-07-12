using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Day06
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
            var input = "../../../../input.txt";
            var sr = new StreamReader(input);
            var lights = new int[1000, 1000];

            string line;
            while ((line = sr.ReadLine()) != null)
            {
                var tokens = line.Split();
                if (tokens[0] == "turn")
                {
                    var coords1 = tokens[2].Split(',').Select(int.Parse).ToList();
                    var coords2 = tokens[4].Split(',').Select(int.Parse).ToList();

                    var value = 0;
                    if (tokens[1] == "on")
                    {
                        value = 1;
                    }
                    for (int i = Math.Min(coords1[0], coords2[0]); i <= Math.Max(coords1[0], coords2[0]); i++)
                    {
                        for (int j = Math.Min(coords1[1], coords2[1]); j <= Math.Max(coords1[1], coords2[1]); j++)
                        {
                            lights[i, j] = value;
                        }
                    }
                }
                else
                {
                    var coords1 = tokens[1].Split(',').Select(int.Parse).ToList();
                    var coords2 = tokens[3].Split(',').Select(int.Parse).ToList();

                    for (int i = Math.Min(coords1[0], coords2[0]); i <= Math.Max(coords1[0], coords2[0]); i++)
                    {
                        for (int j = Math.Min(coords1[1], coords2[1]); j <= Math.Max(coords1[1], coords2[1]); j++)
                        {
                            lights[i, j] = (lights[i, j] + 1) % 2;
                        }
                    }
                }
            }

            var litcount = 0L;
            for (int i = 0; i < 1000; i++)
            {
                for (int j = 0; j < 1000; j++)
                {
                    if (lights[i, j] == 1)
                    {
                        litcount++;
                    }
                }
            }

            Console.WriteLine(litcount);
        }

        static void Part2()
        {
            var input = "../../../../input.txt";
            var sr = new StreamReader(input);
            var lights = new int[1000, 1000];

            string line;
            while ((line = sr.ReadLine()) != null)
            {
                var tokens = line.Split();
                if (tokens[0] == "turn")
                {
                    var coords1 = tokens[2].Split(',').Select(int.Parse).ToList();
                    var coords2 = tokens[4].Split(',').Select(int.Parse).ToList();

                    var value = -1;
                    if (tokens[1] == "on")
                    {
                        value = 1;
                    }
                    for (int i = Math.Min(coords1[0], coords2[0]); i <= Math.Max(coords1[0], coords2[0]); i++)
                    {
                        for (int j = Math.Min(coords1[1], coords2[1]); j <= Math.Max(coords1[1], coords2[1]); j++)
                        {
                            lights[i, j] += value;
                            lights[i, j] = Math.Max(0, lights[i, j]);
                        }
                    }
                }
                else
                {
                    var coords1 = tokens[1].Split(',').Select(int.Parse).ToList();
                    var coords2 = tokens[3].Split(',').Select(int.Parse).ToList();

                    for (int i = Math.Min(coords1[0], coords2[0]); i <= Math.Max(coords1[0], coords2[0]); i++)
                    {
                        for (int j = Math.Min(coords1[1], coords2[1]); j <= Math.Max(coords1[1], coords2[1]); j++)
                        {
                            lights[i, j] += 2;
                        }
                    }
                }
            }

            var litcount = 0L;
            for (int i = 0; i < 1000; i++)
            {
                for (int j = 0; j < 1000; j++)
                {
                    litcount += lights[i,j];
                }
            }

            Console.WriteLine(litcount);
        }
    }
}
