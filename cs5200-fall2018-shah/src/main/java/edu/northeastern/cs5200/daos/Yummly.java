package edu.northeastern.cs5200.daos;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import okhttp3.*;
import okhttp3.Request.Builder;

import java.io.IOException;

@RestController
@CrossOrigin(origins="http://localhost:3000",allowCredentials="true",allowedHeaders="*")
public class Yummly {
	
	@GetMapping("api/yummlyData/{searchParameters}")
	public String searchYummly(@PathVariable("searchParameters") String searchParameters) {
		String appID = "160ba29a";
		String appKey = "fe956024228519c725e17eb9640c48c5";
		searchParameters = searchParameters.replace(' ', '+');
		
		OkHttpClient client = new OkHttpClient();
		Request req = new Builder()
				.url("http://api.yummly.com/v1/api/recipes?_app_id="+appID+"&_app_key="+appKey+"&q="+searchParameters)
				.get()
				.addHeader("Access-Control-Allow-Origin", "*")
				.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
				.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
				.addHeader("Access-Control-Allow-Credentials", "true")
				.addHeader("X-Yummly-App-ID", appID)
				.addHeader("X-Yummly-App-Key", appKey)
				.addHeader("cache-control", "no-cache")
				.build();
		try {
            Response response = client.newCall(req).execute();
            return response.body().string(); 
		} catch (IOException e) {
            
            e.printStackTrace();
        }
        return null;
	}
	
	@GetMapping("api/recipe/{recipeID}")
	public String getYummlyRecipe(@PathVariable("recipeID") String recipeID) {
		String appID = "160ba29a";
		String appKey = "fe956024228519c725e17eb9640c48c5";
		System.out.print(recipeID);
		OkHttpClient client = new OkHttpClient();
		Request req = new Builder()
				.url("http://api.yummly.com/v1/api/recipe/"+recipeID+"?_app_id="+appID+"&_app_key="+appKey)
				.get()
				.addHeader("Access-Control-Allow-Origin", "*")
				.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
				.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
				.addHeader("Access-Control-Allow-Credentials", "true")
				.addHeader("X-Yummly-App-ID", appID)
				.addHeader("X-Yummly-App-Key", appKey)
				.addHeader("cache-control", "no-cache")
				.build();
		try {
            Response response = client.newCall(req).execute();
            return response.body().string(); 
		} catch (IOException e) {
            
            e.printStackTrace();
        }
		return null;
	}

}
