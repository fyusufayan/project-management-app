package com.dairo.ppmtool.services;

import com.dairo.ppmtool.domain.User;
import com.dairo.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.dairo.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){

        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            //username has to be unique
            newUser.setUsername(newUser.getUsername());

            //make sure that password and confirmpassword match
            //dont persist or shot the confirm password
            return userRepository.save(newUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }


}
