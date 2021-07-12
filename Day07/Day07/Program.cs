using System;
using System.Collections.Generic;
using System.IO;

namespace Day07
{
    class Program
    {
        public static Dictionary<string, Circuit> instructions;
        static void Main(string[] args)
        {
            // Part1();
            Part2();
        }

        static void Part1()
        {
            var input = "../../../../input.txt";
            var sr = new StreamReader(input);
            instructions = new Dictionary<string, Circuit>();

            string line;
            while ((line = sr.ReadLine()) != null)
            {
                var tokens = line.Split();
                var output = tokens[^1];
                instructions.Add(output, new Circuit());
                if (tokens.Length == 3)
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.Signal;
                }
                else if (tokens.Length == 4)
                {
                    instructions[output].input1 = tokens[1];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.NOT;
                }
                else if (tokens[1] == "AND")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].input2 = tokens[2];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.AND;
                }
                else if (tokens[1] == "OR")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].input2 = tokens[2];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.OR;
                }
                else if (tokens[1] == "LSHIFT")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].shift = UInt16.Parse(tokens[2]);
                    instructions[output].output = output;
                    instructions[output].gate = Gate.LSHIFT;
                }
                else if (tokens[1] == "RSHIFT")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].shift = UInt16.Parse(tokens[2]);
                    instructions[output].output = output;
                    instructions[output].gate = Gate.RSHIFT;
                }
            }

            var result = CalculateResult("a");
            Console.WriteLine(result);
        }

        static void Part2()
        {
            var input = "../../../../input.txt";
            var sr = new StreamReader(input);
            instructions = new Dictionary<string, Circuit>();

            string line;
            while ((line = sr.ReadLine()) != null)
            {
                var tokens = line.Split();
                var output = tokens[^1];
                instructions.Add(output, new Circuit());
                if (output == "b")
                {
                    instructions[output].input1 = "956";
                    instructions[output].output = output;
                    instructions[output].gate = Gate.Signal;
                }
                else if (tokens.Length == 3)
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.Signal;
                }
                else if (tokens.Length == 4)
                {
                    instructions[output].input1 = tokens[1];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.NOT;
                }
                else if (tokens[1] == "AND")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].input2 = tokens[2];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.AND;
                }
                else if (tokens[1] == "OR")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].input2 = tokens[2];
                    instructions[output].output = output;
                    instructions[output].gate = Gate.OR;
                }
                else if (tokens[1] == "LSHIFT")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].shift = UInt16.Parse(tokens[2]);
                    instructions[output].output = output;
                    instructions[output].gate = Gate.LSHIFT;
                }
                else if (tokens[1] == "RSHIFT")
                {
                    instructions[output].input1 = tokens[0];
                    instructions[output].shift = UInt16.Parse(tokens[2]);
                    instructions[output].output = output;
                    instructions[output].gate = Gate.RSHIFT;
                }
            }

            var result = CalculateResult("a");
            Console.WriteLine(result);
        }

        public static UInt16 CalculateResult(string key)
        { 
            if (UInt16.TryParse(key, out UInt16 result))
            {
                return result;
            }
            if (instructions[key].gate == Gate.Signal)
            {
                var isnum = UInt16.TryParse(instructions[key].input1, out instructions[key].signal);
                if (!isnum)
                {
                    instructions[key].signal = CalculateResult(instructions[key].input1);
                }
                return instructions[key].signal;
            }
            else if (instructions[key].gate == Gate.NOT)
            {
                var value = (ushort)~CalculateResult(instructions[key].input1);
                instructions[key].gate = Gate.Signal;
                instructions[key].signal = value;
                instructions[key].input1 = value.ToString();
                return value;
            }
            else if (instructions[key].gate == Gate.AND)
            {
                var left = CalculateResult(instructions[key].input1);
                var right = CalculateResult(instructions[key].input2);
                var value = (ushort)(left & right);
                instructions[key].gate = Gate.Signal;
                instructions[key].signal = value;
                instructions[key].input1 = value.ToString();
                return value;
            }
            else if (instructions[key].gate == Gate.OR)
            {
                var left = CalculateResult(instructions[key].input1);
                var right = CalculateResult(instructions[key].input2);
                var value = (ushort)(left | right);
                instructions[key].gate = Gate.Signal;
                instructions[key].signal = value;
                instructions[key].input1 = value.ToString();
                return value;
            }
            else if (instructions[key].gate == Gate.LSHIFT)
            {
                var left = CalculateResult(instructions[key].input1);
                var value = (ushort)(left << instructions[key].shift);
                instructions[key].gate = Gate.Signal;
                instructions[key].signal = value;
                instructions[key].input1 = value.ToString();
                return value;
            }
            else if (instructions[key].gate == Gate.RSHIFT)
            {
                var left = CalculateResult(instructions[key].input1);
                var value = (ushort)(left >> instructions[key].shift);
                instructions[key].gate = Gate.Signal;
                instructions[key].signal = value;
                instructions[key].input1 = value.ToString();
                return value;
            }
            else
            {
                return 0;
            }
        }
    }

    class Circuit
    {
        public UInt16 signal;
        public UInt16 shift;
        public string input1;
        public string input2;
        public string output;
        public Gate gate;
    }

    public enum Gate { Signal, AND, OR, NOT, LSHIFT, RSHIFT }
}
