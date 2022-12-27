package com.example.myjwt.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.payload.request.CreateLobRequest;


@RestController
@RequestMapping("/api")
public class LobController extends BaseController {

	

	@PreAuthorize("hasAuthority('EDL')")
	@PostMapping("/lob/createLobRequest")
	public ResponseEntity<?> createLobRequest(@Valid @RequestBody CreateLobRequest createLobRequest,
			HttpServletRequest request) {

		return null;
	}

	
}