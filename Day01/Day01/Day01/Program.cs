using System;
using System.IO;

namespace Day01
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
            var sr = new StreamReader("../../../../../input.txt");

            var directions = sr.ReadLine();

            int floor = 0;
            foreach (char c in directions)
            {
                if (c == '(')
                    floor++;
                else if (c == ')')
                    floor--;
            }

            Console.WriteLine(floor);
        }

        static void Part2()
        {
            var sr = new StreamReader("../../../../../input.txt");

            var directions = sr.ReadLine();

            int floor = 0;
            int index = 0;
            foreach (char c in directions)
            {
                index++;
                if (c == '(')
                    floor++;
                else if (c == ')')
                    floor--;
                if (floor < 0)
                {
                    Console.WriteLine(index);
                    break;
                }
            }
        }
    }
}
