const getHomePage = (req, res) => {
  res.render("chatRoom", {
    pageTitle: "Channel Cluster",
  });
};

module.exports = {
  getHomePage,
};
