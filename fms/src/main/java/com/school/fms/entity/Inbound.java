package com.school.fms.entity;

import com.school.fms.utils.JsonUtils;
import com.school.fms.vo.CodeListVo;

import java.util.List;

/**
 * @Author: hujian
 * @Date: 2020/3/29 19:20
 * @Description: 入库申请表
 */
public class Inbound {
    private Integer orderId;
    private List<CodeListVo> codeListVo;
    private String codeList;
    private String note;
    private String applicant;
    private String applicantTime;
    private int status;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public List<CodeListVo> getCodeListVo() {
        return codeListVo;
    }

    public void setCodeListVo(List<CodeListVo> codeListVo) {
        this.codeListVo = codeListVo;
    }

    public String getCodeList() {
        return codeList;
    }

    public void setCodeList(String codeList) {
        this.codeList = codeList;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getApplicant() {
        return applicant;
    }

    public void setApplicant(String applicant) {
        this.applicant = applicant;
    }

    public String getApplicantTime() {
        return applicantTime;
    }

    public void setApplicantTime(String applicantTime) {
        this.applicantTime = applicantTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
