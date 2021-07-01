using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Day02
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

            string line;
            int totalPaper = 0;
            while ((line = sr.ReadLine()) != null)
            {
                string[] temp = line.Split('x');
                int[] dims = new int[temp.Length];
                for (int i = 0; i < temp.Length; i++)
                {
                    dims[i] = Int32.Parse(temp[i]);
                }

                var sizes = new int[3] { dims[0] * dims[1], dims[0] * dims[2], dims[1] * dims[2] };
                var extra = sizes.Min();

                totalPaper += 2 * (sizes[0] + sizes[1] + sizes[2]) + extra;
            }

            Console.WriteLine(totalPaper);
        }

        static void Part2()
        {
            var sr = new StreamReader("../../../../input.txt");

            string line;
            long totalRibbon = 0;
            while ((line = sr.ReadLine()) != null)
            {
                string[] temp = line.Split('x');
                var dims = new List<int>();
                for (int i = 0; i < temp.Length; i++)
                {
                    dims.Add(Int32.Parse(temp[i]));
                }

                dims.Sort();
                var bow = dims[0] * dims[1] * dims[2];

                totalRibbon += 2 * (dims[0] + dims[1]) + bow;
            }

            Console.WriteLine(totalRibbon);
        }
    }
}
