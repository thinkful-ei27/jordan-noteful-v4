const users = [
  {
    '_id': '333333333333333333333300',
    'fullname': 'Jordo Heff',
    'username': 'Jordoheff',
    'password': '$2a$10$XKUyiW7FVxcYnZqOGFI8D.qUtCsYwGaBPM5URhYxadbkoIag6WSE2'
  },
  {
    '_id': '333333333333333333333301',
    'fullname': 'Zi Zo',
    'username': 'zizo',
    'password': '$2a$10$XKUyiW7FVxcYnZqOGFI8D.qUtCsYwGaBPM5URhYxadbkoIag6WSE2'
  },

];

const folders = [
  {
    '_id': '111111111111111111111100',
    'name': 'Cats'
  },
  {
    '_id': '111111111111111111111101',
    'name': 'Dogs'
  },
  {
    '_id': '111111111111111111111102',
    'name': 'Facts'
  },
  {
    '_id': '111111111111111111111103',
    'name': 'Fiction'
  }
];

const tags = [
  {
    '_id': '222222222222222222222200',
    'name': 'Big'
  },
  {
    '_id': '222222222222222222222201',
    'name': 'Spooky'
  },
  {
    '_id': '222222222222222222222202',
    'name': 'Diddy'
  },
  {
    '_id': '222222222222222222222203',
    'name': 'Cyd Dog'
  }
];


const notes = [
  {
    '_id': '111111111111111111111101',
    'title': 'The most boring article about cats you\'ll ever read',
    'userId': '333333333333333333333300',
    'content': 'Such an article does not exist. Cats are always interesting!',
    'folderId': '111111111111111111111100',
    'tags': ['222222222222222222222202']
  },
  {
    '_id': '111111111111111111111102',
    'title': '5 life lessons learned from cats',
    'content': '1)Spook 2)Bigger is Better 3)Find the Yarn 4)When the mice are away it is time to play',
    'userId': '333333333333333333333300',
    'folderId': '111111111111111111111100',
    'tags': ['222222222222222222222202', '222222222222222222222201', '222222222222222222222200']
  },
  {
    '_id': '111111111111111111111103',
    'title': 'Marketers are making you addicted to dogs and cats',
    'content': 'Have you seen Buzzfeed lately?',
    'userId': '333333333333333333333301',
    'folderId': '111111111111111111111102',
    'tags': ['222222222222222222222203', '222222222222222222222202']
  },
  {
    '_id': '111111111111111111111104',
    'title': 'Ways dogs help you live to 100',
    'content': 'Every day in every way, they are your best friend',
    'userId': '333333333333333333333301',
    'folderId': '111111111111111111111101',
    'tags': ['222222222222222222222203']
  },
  {
    '_id': '111111111111111111111105',
    'title': '9 reasons you can blame the recession on cats',
    'content': 'You cannot do such a thing. Just look at em. SO CUTE!',
    'userId': '333333333333333333333300',
    'folderId': '111111111111111111111100',
    'tags': ['222222222222222222222201']
  },
  {
    '_id': '111111111111111111111106',
    'title': 'The most incredible article about dogs you\'ll ever read',
    'content': 'This is a government secret and cannot be shared.',
    'userId': '333333333333333333333301',
    'folderId': '111111111111111111111101',
    'tags': []
  },
  {
    '_id': '111111111111111111111107',
    'title': '7 things Lady Gaga has in common with cats',
    'content': 'FIERCE FIERCE FIERCE FIERCE FIERCE FIERCE FIERCE',
    'userId': '333333333333333333333300',
    'folderId': '111111111111111111111100',
    'tags': ['222222222222222222222200', '222222222222222222222201']
  },
  {
    '_id': '111111111111111111111108',
    'title': 'How many cats does Vageta Own?',
    'content': 'Over 9000',
    'userId': '333333333333333333333301',
    'folderId': '111111111111111111111103',
    'tags': ['222222222222222222222202', '222222222222222222222201', '222222222222222222222200']
  }
];


module.exports = { folders, tags, notes, users };
