import '@logseq/libs'
import { createPopup } from '@picmo/popup-picker'
import { darkTheme, lightTheme } from 'picmo'
/**
 * main entry
 */
async function main() {
  const appUserConfig = await logseq.App.getUserConfigs()
  const emojiPickerEl = document.createElement('div')
  emojiPickerEl.classList.add('emoji-picker-trigger')
  document.getElementById('app').appendChild(emojiPickerEl)

  let picker = null
  let makePicker = () => {
    if (picker) {
      return picker
    }
    let themeMap = { 'dark': darkTheme, 'light': lightTheme }
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
    picker = createPopup({
      theme: themeMap[appUserConfig.preferredThemeMode],
      custom: customEmoji,
      autoFocusSearch: true,
      animate: false,
    }, {
      triggerElement: emojiPickerEl,
      referenceElement: emojiPickerEl,
      position: 'bottom-start',
      showCloseButton: false
    })

    picker.addEventListener('emoji:select', async (selection) => {
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
      if (e.keyCode === 27) {
        logseq.hideMainUI({ restoreEditingCursor: true })
      }
      e.stopPropagation()
    }, false)

    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('div[class*="EmojiPicker_picker"]')) {
        logseq.hideMainUI({ restoreEditingCursor: true })
      }
    })

    return picker
  }

  logseq.Editor.registerSlashCommand(
    '😀 Emoji picker', async () => {
      const { left, top, rect, } = await logseq.Editor.getEditingCursorPosition()
      Object.assign(emojiPickerEl.style, {
        top: top + rect.top + 'px',
        left: left + rect.left + 'px',
      })
      logseq.showMainUI()

      setTimeout(() => {
        makePicker().open()
      }, 100)
    },
  )
}

// bootstrap
logseq.ready(main).catch(console.error)
