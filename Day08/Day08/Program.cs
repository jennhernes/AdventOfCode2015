using System;
using System.IO;

namespace Day08
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
            var file = "../../../../input.txt";
            var sr = new StreamReader(file);

            string line;
            var litcount = 0L;
            var memcount = 0L;
            while ((line = sr.ReadLine()) != null)
            {
                if (line[0] == '\"' && line[^1] == '\"')
                {
                    litcount += 2;
                    line = line.Substring(1, line.Length - 2);
                }
                for (int i = 0; i < line.Length; i++)
                {
                    char c = line[i];

                    if (c == '\\')
                    {
                        if (line[i+1] == '\\' || line[i+1] == '\"')
                        {
                            litcount += 2;
                            memcount++;
                            i++;
                        }
                        else
                        {
                            litcount += 4;
                            memcount++;
                            i += 3;
                        }
                    }
                }
            }

            Console.WriteLine(litcount - memcount);
        }

        static void Part2()
        {
            var file = "../../../../input.txt";
            var sr = new StreamReader(file);

            string line;
            var litcount = 0L;
            var oldcount = 0L;
            while ((line = sr.ReadLine()) != null)
            {
                if (line[0] == '\"' && line[^1] == '\"')
                {
                    litcount += 6;
                    oldcount += 2;
                    line = line.Substring(1, line.Length - 2);
                }
                for (int i = 0; i < line.Length; i++)
                {
                    char c = line[i];

                    if (c == '\\')
                    {
                        if (line[i + 1] == '\\' || line[i + 1] == '\"')
                        {
                            litcount += 4;
                            oldcount += 2;
                            i++;
                        }
                        else
                        {
                            litcount += 5;
                            oldcount += 4;
                            i += 3;
                        }
                    }
                }
            }

            Console.WriteLine(litcount - oldcount);
        }
    }
}
