var a0 = WScript.Arguments(0);
if ( WScript.Arguments.length > 1 ) {
  for (i = 1; i < WScript.Arguments.length; i++){
    a0 += " " + WScript.Arguments(i);
  }
}
var exe = a0.substring( 0, a0.lastIndexOf( "|" ) );
var args = a0.substring( a0.lastIndexOf( "|" ) + 1 );
var workdir = exe.substring( 0, exe.lastIndexOf( "\\" ) );
var cmdline = '\"' + exe + '\"' + " " + ( args.length != 0 ? args : "" );
var WShell = WScript.CreateObject("WScript.Shell");
//WScript.Echo( "Arg0" + a0 ); WScript.Echo( "exe" + exe ); WScript.Echo( "dir"+workdir ); WScript.Echo( "args"+args ); WScript.Echo( "cmdline"+cmdline );
WShell.CurrentDirectory = workdir;
WShell.Run( cmdline );
