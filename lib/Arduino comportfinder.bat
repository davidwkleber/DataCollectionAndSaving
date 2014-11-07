@echo off
setlocal EnableDelayedExpansion
set "BaseKey=HKLM\System\CurrentControlSet\Enum\USB"
set "Pattern=VID_10C4&PID_EA71"

for /f "tokens=* delims= " %%i in ('reg query "%BaseKey%" /F PortName /S^| findstr "%Pattern%"') do (
  set "str=%%i"
  set str=!str:HKEY_LOCAL_MACHINE=HKLM!
  REM echo !str!
  for /f "tokens=3 delims= " %%A in ('reg query "!str!" /F PortName /S ^|findstr "COM*"') do (
    set str2=!str:\Device Parameters=!
    REM echo !str2!
    for /f "tokens=11,12 delims= " %%b in ('reg query "!str2!" /f FriendlyName /S^| findstr "Interface"') do (
    echo %%b %%c: %%A
 )
  )
)


set "Pattern2=VID_2341&PID_0043"

for /f "tokens=* delims= " %%j in ('reg query "%BaseKey%" /F PortName /S^| findstr "%Pattern2%"') do (
  set "str3=%%j"
  set str3=!str3:HKEY_LOCAL_MACHINE=HKLM!
  REM echo !str3!
  for /f "tokens=3 delims= " %%B in ('reg query "!str3!" /F PortName /S ^|findstr "COM*"') do (
    set str4=!str3:\Device Parameters=!
    REM echo !str4!
    for /f "tokens=3,4 delims= " %%d in ('reg query "!str4!" /f FriendlyName /S^| findstr "Arduino"') do (
    echo %%d %%e: %%B
 )
  )
)

<<<<<<< HEAD
=======
set "Pattern3=VID_1FFB&PID_009E"

for /f "tokens=* delims= " %%j in ('reg query "%BaseKey%" /F PortName /S^| findstr "%Pattern3%"') do (
  set "str5=%%j"
  set str5=!str5:HKEY_LOCAL_MACHINE=HKLM!
  REM echo !str5!
  for /f "tokens=3 delims= " %%B in ('reg query "!str5!" /F PortName /S ^|findstr "COM*"') do (
    set str6=!str5:\Device Parameters=!
    REM echo !str6!
    for /f "tokens=3,8 delims= " %%d in ('reg query "!str6!" /f FriendlyName /S^| findstr "Pololu"') do (
    echo %%d %%e: %%B
 )
  )
)

>>>>>>> origin/master
Pause
