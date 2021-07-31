const checkUserType = async(req,res,next)=>{
    try {
        if (!req.user.isAdmin) {
            res.status(400)
            const err = new Error('Not allowed')
            next(err)
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = checkUserType