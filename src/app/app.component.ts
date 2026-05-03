import { Component, OnInit } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { filter } from "rxjs/operators"
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "projeto-fixacao-cepein"
  isLogin: boolean | null = null

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.routerState.snapshot.url)
    if (this.router.url === "/login") {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
    console.log(this.isLogin)
  }
}
