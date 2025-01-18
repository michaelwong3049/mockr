package com.interviewai.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
//limport com.interviewai.user.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> { }
