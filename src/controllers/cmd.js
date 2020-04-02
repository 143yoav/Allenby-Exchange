const { exec } = require('child_process');

const execute = async (req, res) => {
  try {
    const { cmd } = req.query;
    exec(`allenby-exchange ${cmd}`, (error, stdout, stderr) => {
      var result = stdout;
      if (error) {
        result = error.message;
      } else if (stderr) {
        result = stderr;
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { execute };
