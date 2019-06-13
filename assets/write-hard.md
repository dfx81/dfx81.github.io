/* Question :
 *
 * Write a program with a method called convToKM that will return
 * the value of distance converted from cm to km.
 *
 * The input must be entered in the method by the user while the
 * output willbe displayed in the main method.
 *
 */

import java.util.Scanner;

class WriteHard
{
  public static void main(String[] args)
  {
    WriteHard calc = new WriteHard();
    double km = calc.convToKM();
    System.out.println("The converted distance in km is: " + km + "km");
  }

  double convToKM()
  {
    Scanner in = new Scanner(System.in);
    System.out.print("Enter the distance in cm to be converted to km: ");
    double km, cm = in.nextDouble();
    in.close();
    km = cm / 100000;
    return km;
  }
}
