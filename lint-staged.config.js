module.exports = {
  '*.(js)': ['eslint --fix --cache', 'prettier --write', 'git add'],
  '*.(htm|html|css|less|sass|scss|styl|stylus|md|js)': [
    'prettier --write ',
    'git add',
  ],
}
