using System;
using System.Security.Cryptography;
using System.Text;

namespace Day04
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
            //15223970
            var input = "bgvyzdsv";

            var inputBits = "";

            foreach (char c in input)
            {
                for (int i = 7; i >= 0; i--)
                {
                    inputBits += (c >> i) & 1;
                }
                Console.WriteLine(inputBits);
            }


            MD5 md5 = MD5.Create();
            int suffix = 1;
            while (true)
            {
                byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input + suffix));
                
                if (hash[0] == 0 && hash[1] == 0 && hash[2] < 16)
                {
                    Console.WriteLine(suffix);
                    break;
                }
                suffix++;
            }
        }

        static void Part2()
        {
            var input = "bgvyzdsv";

            var inputBits = "";

            foreach (char c in input)
            {
                for (int i = 7; i >= 0; i--)
                {
                    inputBits += (c >> i) & 1;
                }
                Console.WriteLine(inputBits);
            }


            MD5 md5 = MD5.Create();
            int suffix = 1;
            while (true)
            {
                byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input + suffix));

                if (hash[0] == 0 && hash[1] == 0 && hash[2] == 0)
                {
                    Console.WriteLine(suffix);
                    break;
                }
                suffix++;
            }
        }
    }
}
