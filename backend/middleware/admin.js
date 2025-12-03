module.exports = function(req,res,next){
  if(!req.user) return res.status(401).json({msg:'No user'});
  if(!req.user.isAdmin) return res.status(403).json({msg:'Admin required'});
  next();
};
