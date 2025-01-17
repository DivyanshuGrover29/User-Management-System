import { Request, Response } from "express";
import User from "../models/userModel";

//1. Get All Users
 export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await User.find();
        res.status(200).json({
          message:"Users fetched successfully",
          success:true,
          data: users,
        });
    }catch(error){
        res.status(500).json({
        message: (error as Error).message || "Server Error" 
    });
 }
 };

//2. Create new user
 export const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {username, age, hobbies} = req.body;
        
        if(!username || typeof age !== 'number' || !Array.isArray(hobbies)){
                res.status(400).json({
                message:"Invalid Input Data",
                success:false,
            });
        }
       
        const newUser = await User.create({
            username,
            age,
            hobbies,
        });

            res.status(201).json({
            message:"User created successfully",
            success:true,
            data: newUser,
        });
    } catch(error){
        res.status(500).json({
        message: (error as Error).message || "Server Error", 
    });
    }
 }; 

//3.Update User By ID
   export const updateUser = async (req: Request , res: Response): Promise<void> => {
    try{
      const {userId}= req.params;
      const {username, age, hobbies} = req.body;

      if(!username || typeof age !== 'number' || !Array.isArray(hobbies)){
            res.status(400).json({
            message: "Invalid Input Data",
            success: false,
        });
    }

      const updateUser = await User.findOneAndUpdate(
        { id: userId },
        {username, age, hobbies},
        { new:true , runValidators: true}
      );

      if(!updateUser){
            res.status(404).json({
            message: 'User not found',
            sucess: false,
        });
      }

        res.status(200).json({
        message:"User updated successfully",
        success:true,
        data: updateUser,
      });
    }catch(error){
        res.status(500).json({
        message: (error as Error).message || "Server Error" 
    });
    }
};

//4. DELETE user by ID
   export const deleteUser = async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params;

      try{
         const deletedUser = await User.findOneAndDelete({ id: userId });

         if(!deletedUser){
                res.status(404).json({
                message:"User not found",
                success: false,
            });
            return;
         }

         res.status(204).send();
      }catch(error){
            res.status(500).json({
            message: (error as Error).message || "Server Error" 
    });
    }
   };