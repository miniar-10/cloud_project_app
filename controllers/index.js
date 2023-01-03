const db_con=require('../db.js')

const usersCtrl={
    getUsers:(req,res)=>{
        console.log(db_con)

            db_con.query("SELECT * FROM users", (err, rows) => {
              console.log(rows)
              res.render("user/list", {
                title: "User List",
                data: rows,
              })
            })
    },
    addUser:(req,res)=>{
        
        res.render("user/add", {
               title: "Add New User",
               name: "",
               age: "",
               email: "",
            });
      
    },
    postAddUser: (req, res)=>{
      
           req.assert("name", "Name is required").notEmpty();
           req.assert("age", "Age is required").notEmpty();
           req.assert("email", "Email is required").notEmpty();
        
           var errors = req.validationErrors();
        
           if (!errors) {
             var user = {
               name: req.sanitize("name").escape().trim(),
               age: req.sanitize("age").escape().trim(),
               email: req.sanitize("email").escape().trim(),
             };
             const newUser = req.body;
             db_con.query("INSERT INTO users set ?", [newUser], () => {
               res.redirect("/");
             });
        
        //      req.getConnection(function (error, conn) {
        //         conn.query("INSERT INTO users SET ? ", user, function (err, result) {
        //      if (err) {
        //             req.flash("error", err);
        //             res.render("user/add", {
        //               title: "Add New User",
        //               name: user.name,
        //          age: user.age,
        //          email: user.email,
        //        });
        //      } else {
        //        req.flash("success", "User Added successfully");
        //        res.render("user/add", {
        //          title: "Add New User",
        //          name: "",
        //          age: "",
        //          email: "",
        //        });
        //      }
        //    });
        //  });
           } else {
             var error_msg = "";
             console.log(errors)
             errors.forEach(function (error) {
               error_msg += error.msg + "<br/>";
             });
             req.flash("error", error_msg);
        
             res.render("user/add", {
               title: "Add New User",
               name: req.body.name,
               age: req.body.age,
               email: req.body.email,
             });
           
         };
        
        // app.get("/edit/(:id)", function (req, res, next) {
        //   req.getConnection(function (error, conn) {
        //     conn.query(
        //       "SELECT * FROM users WHERE id = " + req.params.id,
        //       function (err, rows, fields) {
        //         if (err) throw err;
        
        //         if (rows.length <= 0) {
        //           req.flash("error", "User not found");
        //           res.redirect("/users");
        //         } else {
        //           res.render("user/edit", {
        //             title: "Edit User",
        //             id: rows[0].id,
        //             name: rows[0].name,
        //             age: rows[0].age,
        //             email: rows[0].email,
        //           });
        //         }
        //       }
        //     );
        //   });
        // });
    }
}
module.exports=usersCtrl;