const tree = [
  {
    name: 'work',
    type: 'file',
    path: '/home/Documents/work',
    children: []
  },
  {
    name: 'school',
    type: 'file',
    path: '/home/Documents/school',
    children: []
  },
  {
    name: 'misc',
    type: 'dir',
    path: '/home/Documents/misc',
    children: []
  }
]

const subTree = [
  {
    name: 'work',
    type: 'file',
    path: '/home/Documents/misc/work',
    children: []
  }
]

// console.log('Tree: ', tree)
// console.log('SubTree: ', subTree)

const updatedTree = tree.map((item) => {
  if (item.path === '/home/Documents/misc' && item.type === 'dir') {
    return { ...item, children: subTree }
  }
  return item
})

console.log('Updated Tree:', JSON.stringify(updatedTree))

const returnedLog = [
  { name: 'work', type: 'file', path: '/home/Documents/work', children: [] },
  { name: 'school', type: 'file', path: '/home/Documents/school', children: [] },
  {
    name: 'misc',
    type: 'dir',
    path: '/home/Documents/misc',
    children: [{ name: 'work', type: 'file', path: '/home/Documents/misc/work', children: [] }]
  }
]
