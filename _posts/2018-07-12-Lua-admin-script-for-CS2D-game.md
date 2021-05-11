---
title: Lua admin script for CS2D game
---

Lua is popular extension language. Its interpreter is a good choice for embedding within other applications. Knowing it allows you to write mods for countless games and programs. One of which is a small simple game called CS2D. This guide covers creating an administrative script to use on a dedicated server.

## Syntax

To get a grasp on syntax, here is a simple Fizz Buzz implementation:

```lua
function FizzBuzz()
  for i = 1, 100 do
    if i % 3 == 0 and i % 5 == 0 then
      print("FizzBuzz")
    elseif i % 3 == 0 then
      print("Fizz")
    elseif i % 5 == 0 then
      print("Buzz")
    else
      print(i)
    end
  end
end

FizzBuzz()
```

You can also consult the [manual](https://www.lua.org/manual/).

## CS2D API

The `sys/lua/wrapper.lua` file contains syntactic sugar for API. For example:

```lua
function equip(player,weapon) 
  parse("equip "..player.." "..weapon)
end
```

This way you can issue commands to the game engine in clean Lua code.

Create a file in `sys/lua/autorun` and name it `admin.lua`. Your code will load every time you open server in game menu, or run standalone dedicated server. Next, to use the wrapper, put this on top:

```lua
dofile("sys/lua/wrapper.lua")
```

You can identify players by their USGN ID:

```lua
if player(id, "usgn") == 123456 then
  --something
end
```

To execute code under certain conditions, you can use hooks:

```lua
addhook("minute", "hello")
function hello()
  msg("Hello!")
end
```

List of all hooks is [here](https://www.cs2d.com/help.php?hookcat=all&hook=collect#hook).

## Admin script

An admin script is a server mod that gives better control to server staff.

The script will contain:

- 5 ranks
- chat tags and colors
- spawning weapons for owner
- and round restart on demand

### Improving chat

Below the wrapper import add member lists:

```lua
ownerlist = {} -- write your USGN here, like: {123456}
adminlist = {} -- or: {123456, 123241}
smodlist  = {}
modlist   = {}
viplist   = {}
```

And define some colors:

```lua
ownerColor = "\169255000000" --red
adminColor = "\169126252193" --mint green
smodColor  = "\169017025255" --blue
modColor   = "\169130252255" --cyan
vipColor   = "\169255255255" --white

tagColor   = "\169255255255" --white
ctColor    = "\169050150255" --ct color
tColor     = "\169255025000" --t color
```

In CS2D modding there need to be a copyright symbol (&copy;) before RGB color. Writing `\169` instead avoids problems with character encoding.

Now you need to rewrite original messaging function:

```lua
function vmsg(id, team, txt, rank, rankColor)
  if team == 2 then
    msg(ctColor..player(id,"name")..tagColor.." <"..rank..">: "..rankColor..txt)
  elseif team == 1 then
    msg(tColor..player(id,"name")..tagColor.." <"..rank..">: "..rankColor..txt)
  else
    msg(player(id,"name")..tagColor.." <"..rank..">: "..rankColor..txt)
  end
end
```

And hook it up to `say` hook, iterating through member lists:

```lua
addhook("say","vsay")
function vsay(id,txt)
  for _, usgn in ipairs(ownerlist) do
    if player(id, "usgn") == usgn then
      vmsg(id, player(id, "team"), txt, "Owner", ownerColor)
      return 1
    end
  end
  --repeat for every rank
end
```

### Owner menu

Now, to create a GUI menu with API wizardry:

```lua
addhook("serveraction","_serveraction")
function _serveraction(id,action)
  for _, usgn in ipairs(ownerlist) do
    if player(id,'usgn')==usgn then
      if action==1 then
        menu(id,"Owner Menu,Weapons,Restart")
        return
      end
    end
  end
end

addhook("menu","vmenu")
function vmenu(id,title,button)
  if title=="Owner Menu" then
    if button==1 then
      equip(id, "45")
      equip(id, "83")
      equip(id, "88")
      equip(id, "78")
      equip(id, "85")
    elseif button==2 then
      restart(5)
    end
  end
end
```

The menu will appear on pressing F2. You can substitute `equip()` parameters to customize weapons given.

Repository with full code and some modifications is [here](https://github.com/vllur/vAdmin).
