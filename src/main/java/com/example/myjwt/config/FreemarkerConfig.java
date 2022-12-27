package com.example.myjwt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

@Configuration
public class FreemarkerConfig {

	/*
	 * @Bean public FreeMarkerConfigurationFactoryBean getFreeMarkerConfiguration()
	 * { FreeMarkerConfigurationFactoryBean bean = new
	 * FreeMarkerConfigurationFactoryBean();
	 * bean.setTemplateLoaderPath("/templates/"); return bean; }
	 */
    
	/*
	 * @Bean(name="freemarkerConfiguration") public
	 * freemarker.template.Configuration getFreeMarkerConfiguration() {
	 * freemarker.template.Configuration config = new
	 * freemarker.template.Configuration(freemarker.template.Configuration.
	 * getVersion()); config.setClassForTemplateLoading(this.getClass(),
	 * "/templates/"); return config; }
	 */
}