package com.example.myjwt.payload;

import java.util.List;

public class ListResponse<T> {
	private List<T> list;

    public ListResponse() {

    }

    public ListResponse(List<T> list) {
        this.list = list;
    }

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

}
