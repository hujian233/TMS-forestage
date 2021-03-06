package com.school.fms.service;

import com.school.fms.entity.User;

import java.util.List;

/**
 * @Author: hujian
 * @Date: 2020/3/24 14:26
 * @Description: 用户业务接口
 */
public interface UserService {

    /**
     * 检验用户是否注册
     * @param jobNumber 工号
     * @return boolean
     */
    public boolean checkUser(long jobNumber);

    /**
     * 查询用户
     * @param jobNumber 工号
     * @param username 用户名
     * @param authority 权限
     * @param department 部门
     * @return User list
     */
    public List<User> selectUser(Long jobNumber, String username, Integer authority, String department);

    /**
     * 添加用户
     * @param user User
     */
    public void addUser(User user);

    /**
     * 删除用户
     * @param jobNumber 工号
     */
    public void deleteUser(long jobNumber);
    /**
     * 修改密码
     * @param username 用户名
     * @param newPwd 新密码
     */
    public void changePassword(String username,String newPwd);

    /**
     * 更新登录时间
     * @param jobNumber 工号
     */
    void updateTime(long jobNumber);

    void updateAuthority(long jobNumber, int authority);
}
