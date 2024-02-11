// SYNTAX TEST "source.scarpet" "TextMate Grammar Tests"

// Constants

abc = null;
//    ^^^^ constant.language.scarpet

abc = true || false;
//    ^^^^ constant.language.bool.scarpet
//            ^^^^^ constant.language.bool.scarpet

abc = pi || euler;
//    ^^ constant.language.numeric.scarpet
//          ^^^^^ constant.language.numeric.scarpet

// Numeric

abc = 1234567890E+2;
//    ^^^^^^^^^^^^^ constant.numeric.decimal.scarpet

abc = 1234567890E-2;
//    ^^^^^^^^^^^^^ constant.numeric.decimal.scarpet

abc = 0x123456789ABCDEF;
//    ^^^^^^^^^^^^^^^^^ constant.numeric.hex.scarpet

   function();
// ^^^^^^^^ entity.name.function.scarpet
