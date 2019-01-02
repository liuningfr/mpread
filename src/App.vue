<script>
import config from './config';
import { get } from './util';

export default {
  async created () {
    const res = await get('/weapp/demo');
  }
}
</script>

<style>
.text-primary {
  color: #EA5A49
}
.btn {
  color: #fff;
  background: #EA5A49;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 100%;
}
.btn:active {
  background: #FA5A49;
}
</style>
