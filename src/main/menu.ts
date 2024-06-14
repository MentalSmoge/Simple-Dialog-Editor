import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog,
} from 'electron';
import { readFile } from 'fs';

const Store = require('electron-store');
// const { ipcRenderer } = require('electron');

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  // static buildMenu() {
  //   throw new Error('Method not implemented.');
  // }
  // static refreshMenu() {
  //   throw new Error('Method not implemented.');
  // }

  mainWindow: BrowserWindow;

  store: any;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.store = new Store();
  }

  async buildMenu(): Promise<Menu> {
    const template =
        process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : await this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: "Open App's Github",
          click() {
            shell.openExternal('https://github.com/MentalSmoge/Simple-Dialog-Editor');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  async buildDefaultTemplate(): Promise<MenuItemConstructorOptions[]>{

    let webStuffSubMenu: MenuItemConstructorOptions[] = [];

    const myToken = this.store.get('token');

    if (myToken) {
        webStuffSubMenu = [
            {
                label: "Logout",
                click: () => {
                  this.store.delete('token');
                  // window.location.reload();
                  this.mainWindow.webContents.reload();
                  this.buildMenu();
                },
            },
            {
              label: "My projects",
              click: () => {
                this.mainWindow.webContents.send('my-projects');
              },
            },
        ];
    } else {
        webStuffSubMenu = [
            {
                label: "Login",
                click: () => {
                    this.mainWindow.webContents.send('login-command');
                },
            },
            {
                label: "Registration",
                click: () => {
                    this.mainWindow.webContents.send('register-command');
                },
            }
        ];
    }
    // this.buildMenu();

    const templateDefault: MenuItemConstructorOptions[] = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Save',
            accelerator: 'Ctrl+S',
            click: () => {
              this.mainWindow.webContents.send('save-file-command')},
          },
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
            click: () => {
              // construct the select file dialog
              dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [
                  { name: 'Project file', extensions: ['json'] }
                ],
              })
              .then((fileObj) => {
                 // the fileObj has two props
                 // eslint-disable-next-line promise/always-return
                 if (!fileObj.canceled) {
                  readFile(fileObj.filePaths[0],'utf8',(err,contents)=>{
                    if(err){
                      return console.log(err);
                    }
                    this.mainWindow.webContents.send('PROJECT_OPEN', contents)
                    return console.log(contents);
                  })


                  //  this.mainWindow.webContents.send('PROJECT_OPEN', fileObj.filePaths)
                 }
              })
  // should always handle the error yourself, later Electron release might crash if you don't
              .catch((err) => {
                return console.error(err)
              })
           }
          },
          {
            label: '&Export',
            accelerator: 'Ctrl+E',
            click: () => {
              this.mainWindow.webContents.send('export-file-command')},
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen(),
                    );
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen(),
                    );
                  },
                },
              ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: "Open App's Github",
            click() {
              shell.openExternal('https://github.com/MentalSmoge/Simple-Dialog-Editor');
            },
          },
        ],
      },
      {
        label: 'WebStuff',
        submenu: webStuffSubMenu,
      },
    ];

    return Promise.resolve(templateDefault);
  }
}
