using System;
using System.Collections.Generic;
using System.IO;

namespace Day05
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

            string line;
            string[] forbidden = new string[] { "ab", "cd", "pq", "xy" };
            long niceCount = 0;
            while ((line = sr.ReadLine()) != null)
            {
                int numVowels = 0;
                bool doubleLetter = false;

                var prevc = '\0';
                foreach (char c in line)
                {
                    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                    {
                        numVowels++;
                    }
                    if (c == prevc)
                    {
                        doubleLetter = true;
                    }
                    if ((prevc == 'a' && c == 'b') || (prevc == 'c' && c == 'd') || 
                        (prevc == 'p' && c == 'q') || (prevc == 'x' && c == 'y'))
                    {
                        numVowels = 0;
                        doubleLetter = false;
                        break;
                    }

                    prevc = c;
                }

                if (numVowels >= 3 && doubleLetter)
                {
                    niceCount++;
                }
            }

            Console.WriteLine(niceCount);
        }

        static void Part2()
        {
            var input = "../../../../input.txt";
            var sr = new StreamReader(input);

            string line;
            long niceCount = 0;
            while ((line = sr.ReadLine()) != null)
            {
                var pairs = new Dictionary<string, List<int>>();

                var prevc = '\0';
                var prev2c = '\0';
                bool triple = false;
                for (int i = 0; i < line.Length; i++)
                {
                    var c = line[i];
                    string pair = prevc.ToString() + c.ToString();
                    if (!pairs.ContainsKey(pair))
                    {
                        pairs.Add(pair, new List<int>());
                    }
                    pairs[pair].Add(i);
                    
                    if (prev2c == c)
                        triple = true;

                    prev2c = prevc;
                    prevc = c;
                }

                if (triple == true)
                {
                    foreach (List<int> l in pairs.Values)
                    {
                        if (l.Count > 1)
                        {
                            if (l.Count > 2)
                            {
                                niceCount++;
                                break;
                            }
                            l.Sort();
                            if (Math.Abs(l[0] - l[1]) > 1)
                            {
                                niceCount++;
                                break;
                            }
                        }
                    }
                }
            }

            Console.WriteLine(niceCount);
        }
    }
}
