<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    style="margin-top: -32px"
  >
    <v-layout
      wrap
    >
      <v-flex
        v-for="(room, i) in roomlist"
        v-if="!(room.name == 'all')"
        :key="i"
        sm12
        xs12
        md6
        lg4
        style="padding-top: 0px; padding-bottom: 0px"
      >
        <material-card
          color="success"
          style="margin-bottom:0px; padding-bottom:0px"
        >
          <div slot="header">
            <div 
              style="flex: 1 1 100%; height: 45px; margin-top: -15px"
            >
              <span class="title font-weight-light mb-2" v-text="room.name"></span>
              <v-btn
                flat
                icon
                style="margin-bottom: 15px"
                @click="onClickModName(i)"
              >
                <v-icon size="16" >mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                style="float: right"
                @click="addDev"
              >
                <v-icon size="24">mdi-plus</v-icon>
              </v-btn>
              <p
              class="category font-weight-thin"
              style="float: right;margin-top: 21px"
              v-text="$t('add dev')"
              />
            </div>
          </div>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
    <dialog-setname
      :dialog="dialog"
      @toCloseDialog="closeModNameDialog"
      @toModName="modName"
      :srcName="editRoom.name"
      :title="$t('modify name')"
    >
    </dialog-setname>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import webMethods from '@/utils/web-method'
import WEB from '@/utils/web-enum'

export default {
  data () {
    return {
      dialog: false,
      editRoom: {},
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country'
        },
        {
          sortable: false,
          text: 'City',
          value: 'city'
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right'
        }
      ],
      items: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738'
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738'
        }, {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142'
        }, {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735'
        }, {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542'
        }, {
          name: 'Mason Porter',
          country: 'Chile',
          city: 'Gloucester',
          salary: '$78,615'
        }
      ]
    }
  },
  computed: {
    ...mapState(['roomlist'])
  },
  methods: {
    ...mapMutations('websocket', ['sendToServer']),
    closeModNameDialog () {
      this.dialog = false;
    },
    onClickModName (i) {
      this.dialog = true;
      this.editRoom = this.roomlist[i];
    },
    modName (name) {
      console.log(name);
      this.dialog = false;
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.room, {
        id: this.editRoom.id,
        who: 'name',
        what: name
      }));
    }
  }
}

</script>
