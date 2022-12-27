package com.example.myjwt.payload.request;

import com.example.myjwt.beans.KeyValue;
import com.example.myjwt.payload.LeaveRequestParams;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingsRequest {
    private Map<Object, Object> settings;
}
