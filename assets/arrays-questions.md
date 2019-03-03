class Q1{
  public static void main(String[] args){
    String name[];
    name = {"Danial", "Kiru", "Nadzirah"}; //Wrong initialization
    System.out.println(name[1]);
  }}

class Q2{
  public static void main(String[] args){
    int[] num = new int[5];
    for (int n = 0; n <= num.length; n += 1) //Runtime error
      System.out.println(num[n]);
  }}

class Q3{
  public static void main(String[] args){
    double dbl[];
    dbl[] = new double[3];
    dbl[3] = 8.1; //Index doesn't exist
    System.out.println(dbl[3]);
  }}

class Q4{
  public static void main(String[] args){
    String str[] = {"Danial", "Fitri"};
    System.out.println(str); //What to print?
  }}

class Q5{
  public static void main(String[] args){
    Scanner in = new Scanner(System.in); //Scanner wasn't imported
    int size = in.nextInt();
    float[] cgpa = new float[size];
    for (int i = 0; i != size; i = i + 1)
      System.out.println(cgpa[i]);
  }}

import java.util.Scanner;
class Q6{
  public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    char name[] = new char[kb.nextInt()] //Missing semicolon
    for (int i = 0; i < name.length(); i++); //Wrong placement of semicolon
      name[i] = kb.next();
    int i = 0;
    while (i != name.length){
      System.out.print(name[i]);
      i++;
    }}}
