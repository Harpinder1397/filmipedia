import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const sideBarMenu = [
  {
    key: 1,
    icon: <MailOutlined />,
    title: 'Producer',
    menu: [
      { key: 9, path: '/list/producer', title: 'Producer', rootKey: 1 },
      { key: 10, path: '/list/producer/line-producer', title: 'Line Producer', rootKey: 1 },
      { key: 11, path: '/list/producer/executive-producer', title: 'Executive Producer', rootKey: 1 },
      // { key: 13, path: '#', title: 'New User' },
    ],
  },
  {
    key: 2,
    title: 'Director',
    icon: <AppstoreOutlined />,
    menu: [
      { key: 14, path: '/list/director', title: 'Director', rootKey: 2 },
      { key: 15, path: '/list/director/associate-director', title: 'Associate Director', rootKey: 2 },
      { key: 16, path: '/list/director/creative-director', title: 'Creative Director', rootKey: 2 },
      { key: 13, path: '/list/director/assistent-director', title: 'Assistent Director', rootKey: 2 },
    ],
  },
  {
    key: 3,
    title: 'Cinematography',
    icon: <SettingOutlined />,
    menu: [
      { key: 22, path: '#', title: 'DOP', rootKey: 3 },
      { key: 23, path: '#', title: 'DOP Assistent', rootKey: 3 },
      { key: 24, path: '#', title: 'Focus Puller', rootKey: 3 },
      { key: 25, path: '#', title: 'Ronin Operator', rootKey: 3 },
      { key: 26, path: '#', title: 'Gaffer', rootKey: 3 },
      { key: 27, path: '#', title: 'Lightman', rootKey: 3 },
      { key: 28, path: '#', title: 'Drone Operator', rootKey: 3 },
    ],
  },
  {
    key: 29,
    title: 'Artist',
    icon: <SettingOutlined />,
    menu: [
      { key: 30, path: '#', title: 'DOP', rootKey: 29 },
      { key: 31, path: '#', title: 'DOP Assistent',  rootKey: 29 },
      { key: 32, path: '#', title: 'Focus Puller',  rootKey: 29 },
      { key: 33, path: '#', title: 'Ronin Operator',  rootKey: 29 },
      { key: 34, path: '#', title: 'Gaffer',  rootKey: 29 },
      { key: 35, path: '#', title: 'Lightman',  rootKey: 29 },
      { key: 36, path: '#', title: 'Drone Operator',  rootKey: 29 },
    ],
  },
  {
    key: 37,
    title: 'Writer',
    icon: <SettingOutlined />,
    menu: [
      { key: 38, path: '#', title: 'Story Writer',  rootKey: 37 },
      { key: 39, path: '#', title: 'Dialogue Writer',  rootKey: 37 },
      { key: 40, path: '#', title: 'Lyricist',  rootKey: 37 },
    ],
  },
  {
    key: 41,
    title: 'Sound Recordist',
    icon: <SettingOutlined />,
    menu: [
      { key: 48, path: '#', title: 'Mic', rootKey: 41 },
      { key: 49, path: '#', title: 'Boom', rootKey: 41 },
      { key: 50, path: '#', title: 'Sync Sound', rootKey: 41 },
    ],
  },
  {
    key: 51,
    title: 'Art',
    icon: <SettingOutlined />,
    menu: [
      { key: 58, path: '#', title: 'Art Director', rootKey: 51 },
      { key: 59, path: '#', title: 'Asst. Art Director', rootKey: 51 },
      { key: 60, path: '#', title: 'Art Boys', rootKey: 51 },
    ],
  },
  {
    key: 61,
    title: 'Make Up',
    icon: <SettingOutlined />,
    menu: [
      { key: 68, path: '#', title: 'Make Up', rootKey: 61 },
      { key: 69, path: '#', title: 'Hair', rootKey: 61 },
      { key: 70, path: '#', title: 'Special Effects Make Up', rootKey: 61 },
    ]
  },
  {
    key: 71,
    title: 'Choreography',
    icon: <SettingOutlined />,
    menu: [
      { key: 78, path: '#', title: 'Choreographer', rootKey: 71 },
      { key: 79, path: '#', title: 'Dancer', rootKey: 71 },
      { key: 80, path: '#', title: 'Special Effects Make Up', rootKey: 71 },
    ]
  },
  {
    key: 81,
    title: 'Action',
    icon: <SettingOutlined />,
    menu: [
      { key: 88, path: '#', title: 'Action Director', rootKey: 81 },
      { key: 89, path: '#', title: 'Fight Master', rootKey: 81 },
      { key: 90, path: '#', title: 'Stunt Man', rootKey: 81 },
    ]
  },
  {
    key: 91,
    title: 'Costume',
    icon: <SettingOutlined />,
    menu: [
      { key: 92, path: '#', title: 'Costume Designer', rootKey: 91 },
      { key: 93, path: '#', title: 'Asst. Costume Designer', rootKey: 91 },
      { key: 94, path: '#', title: 'Dress Man', rootKey: 91 },
      { key: 95, path: '#', title: 'Tailor', rootKey: 91 },
    ]
  },
  {
    key: 101,
    title: 'Transport',
    icon: <SettingOutlined />,
    menu: [
      { key: 102, path: '#', title: 'Transport Head', rootKey: 101 },
      { key: 103, path: '#', title: 'Drivers', rootKey: 101 },
    ]
  },
  {
    key: 111,
    title: 'Security',
    icon: <SettingOutlined />,
    menu: [
      { key: 112, path: '#', title: 'Security Head', rootKey: 111 },
      { key: 113, path: '#', title: 'Bouncers', rootKey: 111 },
    ]
  },
  {
    key: 121,
    title: 'Food',
    icon: <SettingOutlined />,
    menu: [
      { key: 122, path: '#', title: 'Catering', rootKey: 121 },
      { key: 123, path: '#', title: 'Cook', rootKey: 121 },
    ]
  },
  {
    key: 131,
    title: 'Vanity',
    icon: <SettingOutlined />,
    menu: [
      { key: 132, path: '#', title: 'Vanity Head', rootKey: 131 },
    ]
  },
  {
    key: 141,
    title: 'Spot',
    icon: <SettingOutlined />,
    menu: [
      { key: 144, path: '#', title: 'Spot Head', rootKey: 141 },
      { key: 143, path: '#', title: 'Spot Boy', rootKey: 141 },
    ]
  },
  {
    key: 151,
    title: 'Behind The Scenes',
    icon: <SettingOutlined />,
    menu: [
      { key: 152, path: '#', title: 'Still', rootKey: 151 },
      { key: 153, path: '#', title: 'Making', rootKey: 151 },
    ]
  },
];
export default sideBarMenu;
