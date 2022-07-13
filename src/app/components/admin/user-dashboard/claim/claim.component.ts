import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OperationClaim } from './../../../../models/operationClaims';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  userClaims: OperationClaim[];
  userClaimsLoaded = false;

  claims: OperationClaim[];
  claimsLoaded = false;

  selectedClaim: OperationClaim;

  constructor(
    public config: DynamicDialogConfig,
    private userService: UserService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getClaims()
    this.getUserClaims()


  }

  getClaims(){
    this.userService.getOperationClaims().subscribe(result => {
      this.claims = result.data;
      this.claimsLoaded=true;
    })
  }

  getUserClaims(){
    this.userService.getUserClaims(this.config.data.id).subscribe(result => {
      this.userClaims = result.data;
      this.userClaimsLoaded=true;
    })
  }

  addClaim(){
    this.userService.addClaim({id:0, userId: this.config.data.id, operationClaimId: this.selectedClaim.id}).subscribe(result => {
      if(result.success){
        this.toastrService.success(result.message)
      }
      this.getUserClaims()
    })
  }

  deleteClaim(operationClaim: OperationClaim){

    this.userService.deleteClaim({operationClaimId: operationClaim.id, id: 0, userId: this.config.data.id}).subscribe(result => {
      if(result.success){
        this.toastrService.success(result.message)
      }
      this.getUserClaims();
    })
  }

}
