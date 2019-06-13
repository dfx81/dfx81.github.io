/* Question :
 *
 * Predict the output of the following program.
 *
 */

class PredictHard
{
  public static void main(String[] args)
  {
    PredictHard std = new PredictHard();
    String name = "Danial";
    std.cout("Danial Fitri");
    std.cout(name, 8);
    std.cout(name, "blue");
  }

  void cout(String a)
  {
    System.out.println("This program is written by " + a + ".\n");
  }

  void cout(String a, int b)
  {
    System.out.print(a + "'s favourite number is " + b + ".");
  }

  void cout(String a, String b)
  {
    System.out.println("\n" + a + "'s favourite colour is " + b + ".");
  }
}

/* Output
 *
 * 1 This program is written by Danial Fitri.
 * 2
 * 3 Danial's favourite number is 8.
 * 4 Danial's favourite colour is blue.
 *
 */
