package com.school.fms.service.impl;

import com.school.fms.dao.UserDao;
import com.school.fms.entity.User;
import com.school.fms.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @Author: hujian
 * @Date: 2020/3/24 14:35
 * @Description:
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    @Resource
    UserDao userDao;

    @Override
    public boolean checkUser(long jobNumber) {
        User user = userDao.selectUser(jobNumber, null, null);
        return null != user;
    }

    @Override
    public User selectUser(Long jobNumber, String username, String mailAddress) {
        return userDao.selectUser(jobNumber, username, mailAddress);
    }

    @Override
    public void addUser(User user) {
        userDao.addUser(user);
    }

    @Override
    public void deleteUser(long jobNumber) {
        userDao.deleteUser(jobNumber);
    }

    @Override
    public void changePassword(String username, String newPwd) {

    }
}