const User = require('../models/Users');
const{validationResult} = require('express-validator');
const faker = require('faker');


module.exports = {
    register: (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        const {name, email, password} = req.body;
        User.findOne({email:req.body.email}).then(user => {
            if(user) {
                return req.flash('errors', 'User Already Exists')
            } else {
                const user = new User();
                user.profile.name = req.body.name;
                user.profile.picture = faker.image.avatar();
                user.email = req. body.email;
                user.password = req.body.password;
        
                user.save().then((user) => {
                if (user) {
                    req.login(user, err => {
                        if (err) {
                            return res.status(400).json({confirmation: false, message: err});
                        } else {
                            return res.redirect('/');
                        }
                    })
                }
                    })
                    .catch(err => {
                        return next(err);
                    })
            }
        }).catch(err=>console.log(err))
    }
    // with sync
    // register: async(req, res, next) => {
    //     const errors = validationResult(req);
    //     const {name, email, password} = req.body
    //     if(!errors.isEmpty()) {
    //         return res.status(422).json({errors: errors.array()})
    //     }
    //     let user = await User.findOne({email});
    //     try {
    //         if(user) {
    //             return res.status(500).json({message: 'USer already Exists'}
    //             )};
    //         user = await User.create({
    //             ['profile.name'] : name,
    //             email,
    //             password
    //         });

    //         return res.json({message: 'Success', user});
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
};

