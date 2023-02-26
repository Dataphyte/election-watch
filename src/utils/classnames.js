const classes = (...args) => {
  return args.filter(Boolean).join(' ');
};

export default classes;
