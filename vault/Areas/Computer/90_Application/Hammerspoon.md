---
created: 2025-10-21T09:13
modified: 2025-10-21T09:56
url:
  - http://www.hammerspoon.org/
---

## 配置

```lua
-- hammerspoon config example
-- date: 2023-05-24

local obj = {}
obj._metadata = {
    name = 'hammerspoon config example',
    version = '1.0',
    author = '',
    homepage = '',
    license = 'MIT - https://opensource.org/licenses/MIT',
}

obj.cfg = {}
obj.map = {
    reloadConfig = { { 'ctrl', 'alt' }, 'r' },
    toggleHelp = { { 'ctrl', 'alt' }, '/' },
    windowManager = { { 'ctrl', 'alt' }, 'w' },
    toggleClock = {{'ctrl', 'alt'}, 't'},
    --restartBt = {{'ctrl', 'alt'}, 'b'},
}
obj.spoons = {}

----
function obj:init()
    for k, v in pairs(obj._metadata) do obj[k] = v end
    for _, v in ipairs(obj.spoons) do hs.loadSpoon(v) end

    obj.watchers = {}
    obj.timers = {}
    obj.canvases = {}
    return self
end

function obj:start()
    obj:_setupReloadConfig()
    -- obj:_setupAppLauncher()
    obj:_setupWindowManager()
    obj:_toggleClock(true)
    obj:_setupCaffeinateWatcher()
    -- obj:_mousetap()
    return self
end

function obj:stop()
    return self
end

function obj:bindHotkeys(mapping)
    local def = {
        toggleHelp = function()
            obj:_toggleHelp()
        end,
        toggleClock = function ()
            obj:_toggleClock()
        end,
        restartBt = function ()
            obj:_switchBluetooth(0)
            obj:_switchBluetooth(1)
        end,
    }
    for k, v in pairs(mapping) do
        if def[k] then
            hs.hotkey.bind(v[1], v[2], def[k])
        end
    end
    return self
end

---
function obj:_setupReloadConfig()
    local function notifyAndReload()
        hs.notify.new({ title = "Hammerspoon", informativeText = "Config reloaded." }):send()
        hs.reload()
    end

    local cfgWatcher = obj.watchers['cfgWatcher']
    if not cfgWatcher or not cfgWatcher:running() then
        cfgWatcher = hs.pathwatcher.new(hs.configdir, notifyAndReload)
        obj.watchers['cfgWatcher'] = cfgWatcher
        cfgWatcher:start()
    end

    local keys = obj.map['reloadConfig']
    hs.hotkey.bind(keys[1], keys[2], notifyAndReload)
end

function obj:_setupAppLauncher(keymap, modifiers)
    local modifiers = modifiers or 'alt+cmd'
    local keymap = keymap or {
        a = 'App Store',
        b = 'Safari',
        c = 'Visual Studio Code',
        --d = 'TickTick',
        d = 'Eudic',
        e = 'Emacs',
        f = 'Finder',
        --g = 'Google Chrome',
        g = 'Microsoft Edge',
        h = 'Hammerspoon',
        --i = 'iTerm',
        --j = 'Activity Monitor',
        --k = 'Shortcuts',
        --l = 'Launchpad',
        m = 'com.tencent.QQMusicMac',
        n = 'Notion',
        --o = 'Microsoft Outlook',
        o = 'Obsidian',
        p = 'Photos',
        q = 'QQ',
        r = 'Reminders',
        s = 'System Preferences',
        t = 'iTerm',
        --u = 'Eudic',
        v = 'MacVim',
        w = 'WeChat',
        x = 'XMind',
        y = 'Mail',
        --z = 'System Preferences'
    }

    for k, v in pairs(keymap) do
        hs.hotkey.bind(modifiers, k, function()
            if not hs.application.launchOrFocus(v) then
                hs.application.launchOrFocusByBundleID(v)
            end
        end)
        -- update obj.map
        obj.map[v] = { modifiers, k }
    end
end

function obj:_setupWindowManager()
    local id = 'windowManager'
    local keys = obj.map[id]
    local cmodal = hs.hotkey.modal.new(keys[1], keys[2])

    function cmodal:entered() hs.alert(string.format('Entered %s mode', id)) end

    function cmodal:exited() hs.alert(string.format('Exited %s mode', id)) end

    cmodal:bind('', 'escape', function()
        cmodal:exit()
    end)

    local function move(direction, step)
        local step = step or 10
        local w = hs.window.focusedWindow()
        local f = w:frame()

        if direction == 'up' then
            f.y = f.y - step
        end
        if direction == 'down' then
            f.y = f.y + step
        end
        if direction == 'left' then
            f.x = f.x - step
        end
        if direction == 'right' then
            f.x = f.x + step
        end
        w:setFrame(f)
    end

    local mapping = {
        up = 'k',
        down = 'j',
        left = 'h',
        right = 'l',
    }
    cmodal:bind('ctrl+alt', '/', function()
        obj:_toggleHelp(mapping)
    end)

    for k, v in pairs(mapping) do
        cmodal:bind('', v, function()
            move(k)
        end)
    end
end

function obj:_toggleHelp(data)
    local function create()
        local mainRes = hs.screen.primaryScreen():fullFrame()
        local helpCanvas = hs.canvas.new({ x = (mainRes.w - 600) / 2, y = (mainRes.h - 700) / 2, w = 600, h = 700 }):
            appendElements(
                {
                    type = "rectangle",
                    action = "fill",
                    fillColor = { hex = "#EEEEEE", alpha = 0.95 },
                    roundedRectRadii = { xRadius = 10, yRadius = 10 },
                },
                {
                    type = 'text',
                    text = hs.inspect(data or obj.map) .. '\n\n 😄',
                    textSize = 20,
                    textColor = { hex = "#2390FF", alpha = 1 },
                    textAlignment = 'left',
                }
            )
        return helpCanvas
    end

    local helpCanvas = obj.canvases['helpCanvas']

    if not helpCanvas then
        helpCanvas = create()
        obj.canvases['helpCanvas'] = helpCanvas
    end
    if helpCanvas:isShowing() then
        helpCanvas:hide()
    else
        helpCanvas:show()
    end
end

function obj:_toggleClock(bool)
    local function create()
        local mainRes = hs.screen.primaryScreen():fullFrame()
        local clockCanvas = hs.canvas.new({x=0, y=mainRes.h - 60*2, w=200, h=60*2}):appendElements(
            {
                type = 'rectangle',
                action = 'fill',
                fillColor = {red=0, blue=0, green=0, alpha=0}
            },
            {
                type = 'text',
                text = os.date('%a %b %e'),
                textSize = 20,
                textColor = {hex='#1891C3'},
                textAlignment = 'left',
                frame = {x=10, y=30, w=200, h=60}
            },
            {
                type = 'text',
                text = os.date('%H:%M'),
                textSize = 40,
                textColor = {hex='#1891C3'},
                textAlignment = 'left',
                frame = {x=10, y=60, w=120, h=60}
            }
        )
        clockCanvas:bringToFront(true)
        clockCanvas:behavior(hs.canvas.windowBehaviors.canJoinAllSpaces)
        return clockCanvas
    end

    local clockCanvas = obj.canvases['clockCanvas']
    local clockTimer = obj.timers['clockTimer']

    if not clockCanvas then
        clockCanvas = create()
        obj.canvases['clockCanvas'] = clockCanvas
        clockTimer = hs.timer.doEvery(20, function()
            clockCanvas[2].text = os.date('%a %b %e')
            clockCanvas[3].text = os.date('%H:%M')
        end)
        obj.timers['clockTimer'] = clockTimer
    end
    if clockCanvas:isShowing() then
        if not bool then
            clockCanvas:hide()
        end
    else
        if bool ~= false then
            clockCanvas:show()
        end
    end
end

function obj:_mousetap()
    -- positive multiplier (== natural scrolling) makes mouse work like traditional scrollwheel
    local scrollmult = 4

    -- The were all events logged, when using `{"all"}`
    mousetap = hs.eventtap.new({"all"}, function(e)
        local oldmousepos = hs.mouse.absolutePosition()
        -- local mods = hs.eventtap.checkKeyboardModifiers()
        local pressedMouseButton = e:getProperty(hs.eventtap.event.properties['mouseEventButtonNumber'])
        -- print(pressedMouseButton)

        local typ = e:getType(true)
        if typ == 27 then
            -- 按住中键左右拖拽实现水平滚动 (若无效请先关闭其他手势监控软件)
            -- print(typ)
            local dx = e:getProperty(hs.eventtap.event.properties['eventUnacceleratedPointerMovementX'])
            local dy = e:getProperty(hs.eventtap.event.properties['eventUnacceleratedPointerMovementY'])
            -- print(dx)
            -- print(dy)
            local scroll = hs.eventtap.event.newScrollEvent({dx * scrollmult, dy * scrollmult},{},'pixel')
            scroll:post()
            
            -- put the mouse back
            -- hs.mouse.absolutePosition(oldmousepos)
            
            return true, {scroll}
        else
            return false, {}
        end
    end)
    mousetap:start()
end

function obj:_switchBluetooth(state)
    -- STATE can be one of: 1, on, 0, off
    local cmd = "/opt/homebrew/bin/blueutil --power "..(state)
    hs.osascript.applescript(string.format('do shell script "%s"', cmd))
end

function obj:_setupCaffeinateWatcher()
    local function quitApps()
        local apps = {'Clash Verge', 'OBS'}
        for _, app in ipairs(apps) do
            hs.osascript.applescript(string.format('quit app "%s"', app))
        end
    end

    local function caffeCallback(e)
        if (e == hs.caffeinate.watcher.screensDidSleep) then
            print("screensDidSleep")
            local output, status, type, rc = hs.execute(string.format('/usr/bin/osascript "%s" 2>&1', os.getenv('HOME')..'/bin/quitapps.applescript'), true)
            print(output)
        elseif (e == hs.caffeinate.watcher.screensDidWake) then
            print("screensDidWake")
        elseif (e == hs.caffeinate.watcher.screensDidLock) then
            print("screensDidLock")
            quitApps()
        elseif (e == hs.caffeinate.watcher.screensDidUnlock) then
            print("screensDidUnlock")
            -- obj:_switchBluetooth(0)
            -- obj:_switchBluetooth(1)
        end
    end

    local caffeWatcher = hs.caffeinate.watcher.new(caffeCallback)
    obj.watchers['caffeWatcher'] = caffeWatcher
    caffeWatcher:start()
end

---- main
obj:init():bindHotkeys(obj.map):start()
return obj
```