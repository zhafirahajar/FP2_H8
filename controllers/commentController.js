const { User, Comment, Photo } = require("../models");
const jwt = require("jsonwebtoken");

class commentController{
    
    //post new comment to photo
    static create(req, res){
        let token = req.headers.token;
		let user_login = jwt.verify(token, "secretkey");
        let input = {
            comment : req.body.comment, 
            PhotoId : req.body.PhotoId, 
            UserId: user_login.id  
        }
        Comment.create(input)
        .then(data =>{
            res.status(201).json({
                "comment" : {
                    id: data.id,
                    comment: data.comment,
                    UserId: data.UserId,
                    PhotoId: data.PhotoId,
                    updatedAt: data.updatedAt,
                    createdAt: data.createdAt
                }
            })
        })
        .catch(err=>{
            //console.log(err)
            let errCode = 500;
            let massage = ''
            if(err.name.includes("SequelizeForeignKeyConstraint")){
                errCode = 400
                massage = err.parent.detail
            }else if (err.name.includes("SequelizeValidation")) {
                errCode = 400
                massage = err.errors
            }
            res.status(errCode).json({
                message: massage
            })
        })
    }

    //get comments
    static index(req, res){
        Comment.findAll({
            include : [
                {model: Photo, attributes: ['id', 'title', 'caption', 'poster_image_url']},
                {model: User, attributes: ['id', 'username', 'profile_image_url', 'phone_number']}            
            ]
        })
        .then(data=>{
            res.status(200).json({"comments": data})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }


    //edit komentar
    // parameter comment tidak di kirim tidak terjadi error
    static async edit(req, res){
        let token = req.headers.token;
		let user_login = jwt.verify(token, "secretkey");
        let comment_instance = await Comment.findOne({
			where: {
				id: req.params.commentId
			},
		}); 

        if(comment_instance === null){
            res.status(404).json({massage: "Comment doest not exists"})
        }

        if(user_login.id !== comment_instance.UserId){
            res.status(401).json({massage: "You dont have permission to edit this comment"})
        }else{
            comment_instance.update(
                {
                   comment : req.body.comment 
                }
            )
            .then(data=>{
                res.status(200).json({
                    comment : data
                })
            })
            .catch(err=>{
                res.status(500).json(err)
            })
        }
    }

    //delete komentar
    static async delete(req, res){
        let token = req.headers.token;
		let user_login = jwt.verify(token, "secretkey");
        let comment_instance = await Comment.findOne({
			where: {
				id: req.params.commentId
			},
		}); 

        if(comment_instance === null){
            res.status(404).json({massage: "Comment doest not exitst"})
        }

        if(comment_instance.UserId !== user_login.id){
            res.status(401).json({massage: "You dont have permission to delete this comment"})
        }else{
            comment_instance
            .destroy()
			.then(() => {
				res.status(200).json({
					message: "Your comment has been successfully deleted.",
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
        }
    }
}

module.exports = commentController