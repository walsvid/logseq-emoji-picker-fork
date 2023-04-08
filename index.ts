import '@logseq/libs'
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { createPopup } from '@picmo/popup-picker'
import { autoTheme, darkTheme, lightTheme } from 'picmo'
/**
 * main entry
 */
async function main() {
  const emojiPickerEl = document.createElement('div')
  emojiPickerEl.classList.add('emoji-picker-trigger')
  document.getElementById('app').appendChild(emojiPickerEl)

  const customEmoji = [
    {
      emoji: 'doge',
      label: 'Doge',
      url: 'https://i.imgur.com/HeGEEbu.jpeg',
      tags: ['dog', 'doge', 'meme'],
      data: { id: 1 }
    },
    {
      emoji: 'logseq',
      label: 'Logseq',
      url: 'https://raw.githubusercontent.com/logseq/logseq/master/resources/icons/logseq.png',
      tags: ['logo', 'logseq'],
      data: { id: 2 }
    },
    {
      emoji: 'nyancat',
      label: 'Nyan cat',
      url: 'https://i.imgur.com/MjeqeUP.gif',
      tags: ['cat', 'rainbow', 'meme'],
      data: { id: 3 }
    },
    {
      emoji: 'partyparrot',
      label: 'party parrot',
      url: 'https://i.imgur.com/XQrvNBV.gif',
      tags: ['party', 'parrot', 'meme'],
      data: { id: 4 }
    }
  ]

  let emojiSelected = false
  let picker = null
  let makePicker = async () => {
    if (picker) {
      return picker
    }  

    let themeMap = { 'dark': darkTheme, 'light': lightTheme }
    const logseqTheme = await logseq.App.getStateFromStore<'dark' | 'light'>('ui/theme')

    if(logseq.settings.customEmojiSettings === undefined){
      logseq.updateSettings({
        customEmojiSettings: customEmoji,
      });
    }

    picker = createPopup({
      theme: themeMap[logseqTheme],
      custom: logseq.settings.customEmojiSettings,
      autoFocusSearch: true,
      animate: false,
    }, {
      triggerElement: emojiPickerEl,
      referenceElement: emojiPickerEl,
      position: 'bottom-start',
      showCloseButton: false
    })

    picker.addEventListener('emoji:select', async (selection) => {
      emojiSelected = true
      logseq.hideMainUI()
      if (selection.url) {
        const img = document.createElement('img')
        img.src = selection.url
        img.alt = selection.emoji
        img.setAttribute('style', 'max-height:1em;width:auto;height:auto;display:inline-block')
        const emojiStr = img.outerHTML.replace('>', ' />')
        await logseq.Editor.insertAtEditingCursor(emojiStr)
      } else {
        await logseq.Editor.insertAtEditingCursor(selection.emoji)
      }
    })

    //ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        logseq.hideMainUI({ restoreEditingCursor: true })
      }
      e.stopPropagation()
    }, false)

    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('div[class*="picmo__popupContainer"]') && !emojiSelected) {
        logseq.hideMainUI({ restoreEditingCursor: true })
      }
      emojiSelected = false
    })
    return picker
  }

  const schema:Array<SettingSchemaDesc> = [
    {
      key:"customEmojiSettings",
      type:"object",
      default: customEmoji,
      title:"Custom Emoji Settings",
      description:"Add custom emoji in json config (reload plugin to take effect).",
    }
  ];
  logseq.useSettingsSchema(schema)

  logseq.App.onThemeModeChanged( async () => {
    let themeMap = { 'dark': darkTheme, 'light': lightTheme }
    const logseqTheme = await logseq.App.getStateFromStore<'dark' | 'light'>('ui/theme')
    let theme = themeMap[logseqTheme]
    picker.picker.updateOptions({ theme })
  })

  logseq.Editor.registerSlashCommand(
    '😀 Emoji picker', async () => {
      const { left, top, rect, } = await logseq.Editor.getEditingCursorPosition()
      Object.assign(emojiPickerEl.style, {
        top: top + rect.top + 'px',
        left: left + rect.left + 'px',
      })
      
      picker = await makePicker()
      logseq.showMainUI()

      setTimeout(() => {
        picker.open()
      }, 100)
    },
  )
}

// bootstrap
logseq.ready(main).catch(console.error)
