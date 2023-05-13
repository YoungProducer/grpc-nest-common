import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BaseResponseDto {
  @Expose()
  status: number;

  @Expose()
  error: string | null;
}
