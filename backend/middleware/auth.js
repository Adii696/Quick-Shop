const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const token = req.header('Authorization')?.split(' ')[1];
  if(!token) return res.status(401).json({msg:'No token'});
  try{ req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret'); next(); }catch(e){ res.status(401).json({msg:'Invalid token'}); }
}
