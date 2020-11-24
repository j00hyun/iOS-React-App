//
//  ViewController.swift
//  project-example
//
//  Created by Park JooHyun on 2020/11/23.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var adminList:UITextView!
    @IBOutlet var adminId:UITextField!
    @IBOutlet var adminPw:UITextField!
    
    @IBAction func get(_sender : Any) {
        do {
            // URL 설정 GET 방식으로 호출
            let url = URL(string: "http://54.180.165.95:3000/list")
            let response = try String(contentsOf: url!)
            
            // 읽어온 값을 레이블에 표시
            self.adminList.text = response
        } catch let e as NSError {
            print(e.localizedDescription)
        }
    }
    
    @IBAction func post(_sender:Any) {
        // 전송할 값
        let adminId = self.adminId.text!
        let adminPw = self.adminPw.text!
        let param = "id=\(adminId)&pw=\(adminPw)"
        let paramData = param.data(using: .utf8)
        
        // URL 객체 정의
        let url = URL(string: "http://54.180.165.95:3000/insert")
        
        // URLRequest 객체 정의
        var request = URLRequest(url: url!)
        request.httpMethod = "POST"
        request.httpBody = paramData
        
        // HTTP 메시지 헤더
        request.addValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        
        // URLSession 객체를 통해 전송
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            // 서버가 응답이 없거나 통신이 실패
            if let e = error {
                NSLog("An error has occured: \(e.localizedDescription)")
                return
            }
        }
        // POST 전송
        task.resume()
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

